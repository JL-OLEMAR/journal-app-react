/**
 * @jest-environment node
 */

import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { createSerializer } from 'enzyme-to-json'
import { expect, vi } from 'vitest'
import 'sweetalert2'

Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

// Mock the sweetalert2 library ↓↓
vi.mock('sweetalert2', () => ({
  fire: vi.fn(),
  close: vi.fn()
}))

// const noScroll = () => {}
// Object.defineProperty(window, 'scrollTo', { value: noScroll, writable: true })
