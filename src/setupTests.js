import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme from 'enzyme'
import { createSerializer } from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' })) //eslint-disable-line
