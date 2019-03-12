import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import logger from '../src/utils/logger';

Enzyme.configure({ adapter: new Adapter() });

logger.disable();
