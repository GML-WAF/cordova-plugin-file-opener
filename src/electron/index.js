/*
The MIT License (MIT)

Copyright (c) 2020 pwlin - pwlin05@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Runs in the Electron main process (cordova-electron >= 3.0).
// https://www.electronjs.org/docs/latest/api/shell#shellopenpathpath
const { shell } = require('electron');
const { fileURLToPath } = require('url');

function toPath (fileName) {
    if (typeof fileName !== 'string' || fileName === '') {
        throw new Error('No file name given.');
    }
    return /^file:/i.test(fileName) ? fileURLToPath(fileName) : fileName;
}

async function openFile (fileName) {
    const errorMessage = await shell.openPath(toPath(fileName));
    if (errorMessage) {
        throw new Error('Failed opening file: ' + errorMessage);
    }
    return true;
}

module.exports = {
    // cordova-electron invokes actions with the exec() args array, wrapped as
    // [args]. Accept both the wrapped and unwrapped form.
    open: function (args) {
        const list = Array.isArray(args) && Array.isArray(args[0]) ? args[0] : args;
        return openFile(Array.isArray(list) ? list[0] : list);
    }
};
