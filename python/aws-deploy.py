#! /usr/bin/env python3
import os
import sys

import boto3
import pytoml

DEPLOYMENT_FILE = 'aws-deployment.toml'


class Main():
    def __init__(self):
        self.deployinfo = None
        self.load_deployinfo()

    def load_deployinfo(self):
        if os.path.exists(DEPLOYMENT_FILE):
            with open(DEPLOYMENT_FILE) as fp:
                self.deployinfo = pytoml.load(fp)
            return

        # Deployment file does not exist. Need to create and save.
        domain = input('domain name (without www.): ')
        if domain.startswith('http://') or domain.startswith('https://'):
            domain = domain.split('://', 1)[1]
        if '/' in domain:
            print('Invalid domain name entered.', file=sys.stderr)
            exit(1)

        self.deployinfo = {
            'deployment': {
                's3': {
                    'deployed': False
                }
            },
            'meta': {
                'domain': domain
            }
        }
        self.save_deployinfo()

    def save_deployinfo(self):
        with open(DEPLOYMENT_FILE, 'w') as fp:
            pytoml.dump(self.deployinfo, fp)

    def deploy(self):
        self.deploy_s3()

    def deploy_s3(self):
        s3 = boto3.resource('s3')
        s3info = self.deployinfo['deployment']['s3']

        # Deploy bucket if necessary
        if not s3info['deployed']:
            bucket_name = input('create s3 bucket with name: ')
            s3info['bucket_name'] = bucket_name

        bucket = s3.Bucket(s3info['bucket_name'])
        bucket.create()

        s3info['deployed'] = True
        self.save_deployinfo()

        # Create bucket directory structure
        bucket.put_object(
            ACL='private',
            Key='public/'
        )
        bucket.put_object(
            ACL='public-read',
            Key='public/%s/' % self.deployinfo['meta']['domain']
        )

        bucket.put_object(
            ACL='private',
            Key='logs/'
        )
        bucket.put_object(
            ACL='private',
            Key='public/%s/' % self.deployinfo['meta']['domain']
        )


if __name__ == '__main__':
    main = Main()
    main.deploy()
