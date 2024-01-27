export const allowedFileExt = [
    // office
    '.docx',
    '.doc',
    '.pptx',
    '.ppt',
    '.xls',
    '.xlsx',

    // Open document ...
    '.odt',
    '.ods',
    '.odp',
    '.odg',
    '.odf',
    '.odb',
    '.odi',
    '.odm',
    '.ott',
    '.ots',
    '.otp',
    '.otg',
    '.otf',
    '.otb',
    '.oti',
    '.oth',
    '.odc',
    '.odft',

    // text
    '.rtf',
    '.txt',
    '.md',
    '.markdown',
    '.tex',
    '.pdf',
    '.html',

    // images
    '.png',
    '.jpg',
    '.webp',
    '.ico',
    '.svg',
    '.gif',
    '.bmp',
    '.tif',
    '.tiff',

    // archives
    '.zip',
    '.rar',
    '.tar.gz',
    '.7z',
    '.deb',
    '.rpm',

    // executables
    '.exe',
    '.msi',
    '.dmg',
    '.pkg',
    '.jar',
    '.bat',
    '.sh',
    '.bin',
    '.apk',

    // data
    '.csv',
    '.json',
    '.xml',
    '.yaml',
    '.yml',
    '.toml',
    '.ini',
    '.env.*',
];

export const allowedFileExtStr = allowedFileExt.join(', ');
