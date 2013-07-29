
var should = require('should');

var HDFSTestDir = '/test';

describe('WebHDFSClient', function () {

    var client = new (require('..')).WebHDFSClient({ user: 'ryan' });

    describe('#mkdirs', function () {

        it('should return `true` if the directory was created', function (done) {

            client.mkdirs(HDFSTestDir, function (err, success) {

                should.not.exist(err);
                should.exist(success);

                success.should.be.true;

                return done();

            });

        });

    });

    describe('#getFileStatus()', function () {

        it('should return information about the directory', function (done) {

            client.getFileStatus(HDFSTestDir, function (err, status) {

                should.not.exist(err);
                should.exist(status);

                status.should.have.property('type', 'DIRECTORY');

                return done();

            });

        });

    });

    describe('#create()', function () {

        it('should return the path to the new file', function (done) {

            client.create(HDFSTestDir + '/foo.txt', '{"foo":"bar",', function (err, path) {

                should.not.exist(err);
                should.exist(path);

                return done();

            });

        });

    });

    describe('#rename()', function () {

        it('should return `true` if the file was renamed', function (done) {

            client.rename(HDFSTestDir + '/foo.txt', HDFSTestDir + '/bar.txt', function (err, success) {

                should.not.exist(err);
                should.exist(success);

                success.should.be.true;

                return done();

            });

        });

    });

    describe('#append()', function () {

        it('should return `true` if the data was appended', function (done) {

            client.append(HDFSTestDir + '/bar.txt', '"bar": "baz"}', function (err, success) {

                should.not.exist(err);
                should.exist(success);

                success.should.be.true;

                return done();

            });

        });

    });

    describe('#getContentSummary()', function () {

        it('should return summary of directory content', function (done) {

            client.getContentSummary(HDFSTestDir, function (err, summary) {

                should.not.exist(err);
                should.exist(summary);

                summary.should.have.property('fileCount', 1);

                return done();

            });

        });

    });

    describe('#getFileChecksum()', function () {

        it('should return a file checksum', function (done) {

            client.getFileChecksum(HDFSTestDir + '/bar.txt', function (err, checksum) {

                should.not.exist(err);
                should.exist(checksum);

                checksum.should.have.property('bytes', '000002000000000000000000dbdf72650428467285b0d32f1b12e8d500000000');

                return done();

            });

        });

    });

    describe('#open()', function () {

        it('should return the files content', function (done) {

            client.open(HDFSTestDir + '/bar.txt', function (err, data) {

                should.not.exist(err);
                should.exist(data);

                JSON.parse(data).should.have.property('bar', 'baz');

                return done();

            });

        });

    });

    describe('#del()', function () {

        it('should return `true` if the directory was deleted', function (done) {

            client.del(HDFSTestDir, { recursive: true }, function (err, success) {

                should.not.exist(err);
                should.exist(success);

                success.should.be.true;

                return done();

            });

        });

    });

});
