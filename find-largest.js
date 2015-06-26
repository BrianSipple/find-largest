var fs = require('fs'),
    Q = require('q'),
    path = require('path'),
    fs_readdir = Q.denodeify(fs.readdir),
    fs_stat = Q.denodeify(fs.stat),

    api = {};


function getFileStats(files, dirName) {
    var promises = files.map(function (file) {
        return fs_stat(path.join(dirName, file));
    });
    return Q.all(promises).then(function (stats) {
        return [files, stats];
    });
}

function computeLargestFile(filesAndStats) {
    var files = filesAndStats[0],
        stats = filesAndStats[1],

        largest = stats
            .filter(function (stat) { return stat.isFile(); })
            .reduce(function (prev, next) {
                if (prev.size > next.size) {
                    return prev;
                }
                return next;
            });

    return files[stats.indexOf(largest)];
}


api = function find (dir) {

    return fs_readdir(dir)
        .then(function (files) {
            return getFileStats(files, dir);
        })
        .then(function (filesAndStats) {
            return computeLargestFile(filesAndStats);
        })
        .catch(function (err) {
            throw err;
        });
};


module.exports = api;

