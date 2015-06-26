var
    expect = require('chai').expect,
    findLargest = require('../find-largest.js'),
    dirPath = 'test/test-data',
    largestFileName = 'large-file.txt';

describe('find-largest.js tests', function () {

    describe('require module', function () {

        it('should be defined', function () {

            expect(findLargest).to.be.defined;
        });

    });
    describe('#API', function () {

        it('should return a promise', function () {
            expect(findLargest(dirPath)).to.be.defined;
            expect(findLargest(dirPath).then).to.be.defined;
        });
        
        describe('Promise resolution', function () {

            var promise;
            beforeEach(function () {
                promise = findLargest(dirPath);
            });

            it('should expose a function that takes the name of a directory path, and return ' +
                'a promise that resolves to the name of the largest file in that directory', function (done) {

                promise.then(function (res) {
                    expect(res).to.equal(largestFileName);
                    done();

                // If the expectation throws an error during the async promise resolution,
                // we can access that error through the promises OWN internal done() property and
                // pass it along to Mocha.
                }).done(null, function (error) {
                    done(error);
                });
            });
        });

    });
});
