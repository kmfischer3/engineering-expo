import os
import sys
import json
import lxml.etree

MAPS_DIR = './static/maps/'
metadata = {}

for map_file_name in os.listdir(MAPS_DIR):
    # Initialize an empty list of table IDs
    tables = []

    # Find all table ids in current map file
    with open(os.path.join(MAPS_DIR, map_file_name)) as map_file:
        xml = lxml.etree.parse(map_file)

        for tableid in xml.xpath('//*[starts-with(@id, "table")]/@id'):
            tables.append(int(tableid[5:]))

    # Sort table IDs
    tables.sort()

    # Confirm that the map contains table IDs
    if len(tables) == 0:
        print('%s: does not contain any tables.' % map_file_name,
              file=sys.stderr)
        exit(1)

    # Confirm that table IDs are continuous
    previous = tables[0]
    for i in range(1, len(tables)):
        if tables[i] != previous + 1:
            print('%s: does not contain continous table IDs.' % map_file_name,
                  file=sys.stderr)
            print('  Table IDs skipped from "table%i" to "table%i"' %
                  (previous, tables[i]), file=sys.stderr)
            exit(1)
        previous = tables[i]

    # Store data in metadata object
    metadata[map_file_name] = {
        'tables': {
            'start': tables[0],
            'end': tables[-1]
        }
    }

# Verify that all IDs in range are covered and non-overlapping
min_table_id = 99999
max_table_id = -1
for map_file_name in metadata:
    meta = metadata[map_file_name]
    min_table_id = min(min_table_id, meta['tables']['start'])
    max_table_id = max(max_table_id, meta['tables']['end'])
    assert(min_table_id <= max_table_id)
table_found = [False] * (max_table_id - min_table_id + 1)
for map_file_name in metadata:
    meta = metadata[map_file_name]
    for i in range(meta['tables']['start'], meta['tables']['end'] + 1):
        if table_found[i + min_table_id]:
            print('%s: has a duplicate table ID: "table%i"' %
                  (map_file_name, i + min_table_id), file=sys.stderr)
            exit(1)
        table_found[i] = True
for i in range(0, len(table_found)):
    if not table_found[i]:
        print('Could not find table ID "table%i" in map files."' %
              i + min_table_id, file=sys.stderr)
        exit(1)

# Output JavaScript metadata file
map_files_by_start = {metadata[x]['tables']['start']: x for x in metadata}
starts = list(map_files_by_start.keys())
starts.sort()
names = [map_files_by_start[start] for start in starts]
# Add the end of the last range for comparison
starts += [metadata[map_files_by_start[starts[-1]]]['tables']['end'] + 1]

print('''var MAP_METADATA_STARTS = {starts};
var MAP_METADATA_NAMES = {names};
'''.format(**{
    'starts': json.dumps(starts),
    'names': json.dumps(names)
    }))
