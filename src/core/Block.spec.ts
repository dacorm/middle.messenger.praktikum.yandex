import {assert} from 'chai';
import Block from './block';
import {compile} from "pug";

class DummyComponent extends Block {
    render(): string {
        return compile('div Текст')();
    }
}

const block = new DummyComponent({

});

describe('Block', () => {
    before(() => {
        block.setProps({ prop: 'testProp' })
    })


    it('метод render возвращает правильное содержимое', () => {
        assert.equal(block.content.innerHTML, 'Текст');
    });

    it('setProps меняет пропсы компонента', () => {
        block.setProps({__id:'test'})
        assert.deepEqual(block.props, { __id:'test', prop: 'testProp' });
    });
});