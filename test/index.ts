import {strict as assert} from 'assert'
import 'mocha'

import QR from '../src'

suite('qr', function () {
    test('small', function () {
        assert.doesNotThrow(() => {
            QR('test')
        })
    })
    test('big', function () {
        assert.doesNotThrow(() => {
            QR('test', 'H', 40)
        })
    })
})
