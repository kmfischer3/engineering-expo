// BitPack constants
var BITPACK_ATTRIBUTES_EMPTY = new BitPack('AA==');
var BITPACK_ATTRIBUTES_ALL = new BitPack('Dw==');

var ATTRIBUTES = ['student_exhibit', 'competition', 'speaker', 'industry'];
var ATTRIBUTE_INDEXES = {
    'student_exhibit': 7,
    'competition': 6,
    'speaker': 5,
    'industry': 4
};
var ATTRIBUTE_STRINGS = {
    'student_exhibit': 'Student Exhibit',
    'competition': 'Competition',
    'speaker': 'Speaker',
    'industry': 'Industry'
};

var BITPACK_DEGREES_EMPTY = new BitPack('AA==');
var BITPACK_DEGREES_ALL = new BitPack('Dw==');
var BITPACK_WORK_AUTH_EMPTY = new BitPack('AA==');
var BITPACK_WORK_AUTH_ALL = new BitPack('8A==');

// Citizen indexes
var WORK_AUTH_INDEX = 0;
var US_INDEX = 0;
var PR_INDEX = 1;
var VH_INDEX = 2;

// Major indexes
var MAJOR_DATA_INDEX = 1;
var MAJOR_INDEXES = {
    'AMEP': 0,
    'AOS': 4,
    'ASPHYS': 8,
    'BIOCHEM': 12,
    'BME': 16,
    'BSE': 20,
    'CEE': 24,
    'CHE': 28,
    'CHEM': 32,
    'CMPE': 36,
    'CS': 40,
    'ECT': 44,
    'EE': 48,
    'EMA': 52,
    'ENG': 56,
    'ENVSCI': 60,
    'EP': 64,
    'FOODSCI': 68,
    'GEO': 72,
    'GLE': 76,
    'IE': 80,
    'LMS': 84,
    'MatE': 88,
    'MATH': 92,
    'ME': 96,
    'MPHY': 100,
    'MS&E': 104,
    'MSE': 108,
    'NEEP': 112,
    'OTM': 116,
    'PHM': 120,
    'PHY': 124,
    'STAT': 128,
    'TOX': 132
};

var MAJORS = ['AMEP', 'AOS', 'ASPHYS', 'BIOCHEM', 'BME', 'BSE', 'CEE', 'CHE',
              'CHEM', 'CMPE', 'CS', 'ECT', 'EE', 'EMA', 'ENG', 'ENVSCI', 'EP',
              'FOODSCI', 'GEO', 'GLE', 'IE', 'LMS', 'MatE', 'MATH', 'ME',
              'MPHY', 'MS&E', 'MSE', 'NEEP', 'OTM', 'PHM', 'PHY', 'STAT',
              'TOX'];

// Position Offsets
var I_OFFSET = 0;
var C_OFFSET = 1;
var E_OFFSET = 2;
var X_OFFSET = 3;
var POSITION_OFFSETS = [I_OFFSET, C_OFFSET, E_OFFSET, X_OFFSET];

/* EVENT SOURCES */
var SOURCE_DEFAULT = 0;
var SOURCE_SEARCH = 1;
var SOURCE_FILTER = 2;

/* OTHER CONSTANTS */
var DEFAULT_DAY_ID = 0;
var DEFAULT_MAP_ID = 0;
