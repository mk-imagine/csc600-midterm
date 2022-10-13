import * as mt from "./midterm";

// renameSlice
describe('1a. renameSlice', () => {

    test('1', () => {
      expect(mt.renameSlice(mt.pizza1, "Daniel")).toEqual({
        tag: 'SLICE',
        name: 'Daniel',
        toppings: [ 'MUSHROOMS', 'CHEESE' ]
      });
    });
  
    test('2', () => {
        expect(mt.renameSlice(mt.pizza1, "Danny")).toEqual({
            tag: 'SLICE',
            name: 'Danny',
            toppings: [ 'MUSHROOMS', 'CHEESE' ]
          });
    });

});

// addToppingsToSlice
describe('1b. addToppingsToSlice', () => {

    test('1', () => {
      expect(mt.addToppingsToSlice(mt.pizza1, [])).toEqual({
        tag: 'SLICE',
        name: 'Dan',
        toppings: [ 'MUSHROOMS', 'CHEESE' ] 
      });
    });
  
    test('2', () => {
        expect(mt.addToppingsToSlice(mt.pizza1, ["CHICKEN"])).toEqual({
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN' ]
        });
    });
  
    test('3', () => {
        expect(mt.addToppingsToSlice(mt.pizza1, ["CHICKEN", "CHEESE"])).toEqual({
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN', 'CHEESE' ]
        });
    });
  
    test('4', () => {
        expect(mt.addToppingsToSlice(mt.pizza2, ["CHICKEN", "CHEESE", "SAUCE"])).toEqual({
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHICKEN', 'CHEESE', 'SAUCE' ]
        });
    });

});

// removeToppingFromSlice
describe('1c. removeToppingFromSlice', () => {

    test('removeToppingFromSlice(mt.pizza2, "CHICKEN")', () => {
      expect(mt.removeToppingFromSlice(mt.pizza2, "CHICKEN")).toEqual(
        { tag: 'SLICE', name: 'Jane', toppings: [ 'SAUCE' ] }
      );
    });
  
    test('removeToppingFromSlice(mt.pizza2, "SAUCE")', () => {
        expect(mt.removeToppingFromSlice(mt.pizza2, "SAUCE")).toEqual(
            { tag: 'SLICE', name: 'Jane', toppings: [ 'CHICKEN', 'CHICKEN' ] }
        );
    });
  
    test('removeToppingFromSlice(mt.pizza2, "CHEESE")', () => {
        expect(mt.removeToppingFromSlice(mt.pizza2, "CHEESE")).toEqual({
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
        });
    });

});

// // weightOfTopping
describe('2a. weightOfTopping', () => {

    test('weightOfTopping("CHEESE")', () => {
      expect(mt.weightOfTopping("CHEESE")).toBe(4);
    });
  
    test('weightOfTopping("CHICKEN")', () => {
        expect(mt.weightOfTopping("CHICKEN")).toBe(6);
    });
  
    test('weightOfTopping("MUSHROOMS")', () => {
        expect(mt.weightOfTopping("MUSHROOMS")).toBe(2);
    });
  
    test('weightOfTopping("PEPPERONI")', () => {
        expect(mt.weightOfTopping("PEPPERONI")).toBe(1);
    });
  
    test('weightOfTopping("SAUCE")', () => {
        expect(mt.weightOfTopping("SAUCE")).toBe(3);
    });

});

// weightOfToppingsInSlice
describe('2b. weightOfToppingsInSlice', () => {

    test('weightOfToppingsInSlice(pizza1)', () => {
        expect(mt.weightOfToppingsInSlice(mt.pizza1)).toBe(6);
    });
  
    test('weightOfToppingsInSlice(pizza2)', () => {
        expect(mt.weightOfToppingsInSlice(mt.pizza2)).toBe(15);
    });

});

// removeSliceFromHalve
describe('2c. removeSliceFromHalve', () => {

    test('removeSliceFromHalve(pizza3, "Dan")', () => {
        expect(mt.removeSliceFromHalve(mt.pizza3, "Dan")).toEqual(
            { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
        );
    });
  
    test('removeSliceFromHalve(pizza3, "Bob")', () => {
        expect(mt.removeSliceFromHalve(mt.pizza3, "Bob")).toEqual(
            { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] }
        );
    });
  
    test('removeSliceFromHalve(pizza3, "Jane")', () => {
        expect(mt.removeSliceFromHalve(mt.pizza3, "Jane")).toEqual(
            {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
                halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
            }
        );
    });
  
    test('removeSliceFromHalve(pizza4, "Jane")', () => {
        expect(mt.removeSliceFromHalve(mt.pizza4, "Jane")).toEqual(
            {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
                halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
            }
        );
    });
  
    test('removeSliceFromHalve(pizza4, "Dan")', () => {
        expect(mt.removeSliceFromHalve(mt.pizza4, "Dan")).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'HALVE',
                    halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
                    halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
                },
                halve2: {
                    tag: 'SLICE',
                    name: 'Jane',
                    toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
                }
            }
        );
    });
});


// addToppingsToPizza
describe('3a. addToppingsToPizza', () => {

    test('addToppingsToPizza(pizza1, ["CHEESE"])', () => {
        expect(mt.addToppingsToPizza(mt.pizza1, ["CHEESE"])).toEqual(
            {
                tag: 'SLICE',
                name: 'Dan',
                toppings: [ 'MUSHROOMS', 'CHEESE', 'CHEESE' ]
            }
        );
    });
  
    test('addToppingsToPizza(pizza2, ["CHEESE", "CHEESE"])', () => {
        expect(mt.addToppingsToPizza(mt.pizza2, ["CHEESE", "CHEESE"])).toEqual(
            {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHEESE', 'CHEESE' ]
            }
        );
    });
  
    test('addToppingsToPizza(pizza3, ["SAUCE"])', () => {
        expect(mt.addToppingsToPizza(mt.pizza3, ["SAUCE"])).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'SLICE',
                    name: 'Dan',
                    toppings: [ 'MUSHROOMS', 'CHEESE', 'SAUCE' ]
                },
                halve2: {
                    tag: 'SLICE',
                    name: 'Bob',
                    toppings: [ 'CHICKEN', 'CHEESE', 'SAUCE' ]
                }
            }
        );
    });
  
    test('addToppingsToPizza(pizza4, ["SAUCE"])', () => {
        expect(mt.addToppingsToPizza(mt.pizza4, ["SAUCE"])).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'HALVE',
                    halve1: {
                    tag: 'SLICE',
                    name: 'Dan',
                    toppings: [ 'MUSHROOMS', 'CHEESE', 'SAUCE' ]
                    },
                    halve2: {
                    tag: 'SLICE',
                    name: 'Bob',
                    toppings: [ 'CHICKEN', 'CHEESE', 'SAUCE' ]
                    }
                },
                halve2: {
                    tag: 'SLICE',
                    name: 'Jane',
                    toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'SAUCE' ]
                }
            }
        );
    });

});

// weightOfToppingsInPizza
describe('3b. weightOfToppingsInPizza', () => {

    test('weightOfToppingsInPizza(pizza1)', () => {
        expect(mt.weightOfToppingsInPizza(mt.pizza1)).toBe(6);
    });

    test('weightOfToppingsInPizza(pizza2)', () => {
        expect(mt.weightOfToppingsInPizza(mt.pizza2)).toBe(15);
    });

    test('weightOfToppingsInPizza(pizza3)', () => {
        expect(mt.weightOfToppingsInPizza(mt.pizza3)).toBe(8);
    });

    test('weightOfToppingsInPizza(pizza4)', () => {
        expect(mt.weightOfToppingsInPizza(mt.pizza4)).toBe(11.5);
    });

});

// // Bonus
describe('Bonus', () => {

    test('tradeSlices("Dan", "Jane", pizza4)', () => {
        expect(mt.tradeSlices("Dan", "Jane", mt.pizza4)).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'HALVE',
                    halve1: { tag: 'SLICE', name: 'Jane', toppings: ["SAUCE", "CHICKEN", "CHICKEN"] },
                    halve2: { tag: 'SLICE', name: 'Bob', toppings: ["CHICKEN", "CHEESE"] }
                },
                halve2: { tag: 'SLICE', name: 'Dan', toppings: ["MUSHROOMS", "CHEESE"] }
            }
        );["MUSHROOMS", "CHEESE"]
    });
  
    test('tradeSlices("Dan", "Bob", pizza4)', () => {
        expect(mt.tradeSlices("Dan", "Bob", mt.pizza4)).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'HALVE',
                    halve1: { tag: 'SLICE', name: 'Bob', toppings: ["CHICKEN", "CHEESE"] },
                    halve2: { tag: 'SLICE', name: 'Dan', toppings: ["MUSHROOMS", "CHEESE"] }
                },
                halve2: {
                    tag: 'SLICE',
                    name: 'Jane',
                    toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
                }
            }
        );
    });
  
    test('tradeSlices("Jill", "Dan", pizza4)', () => {
        expect(mt.tradeSlices("Jill", "Dan", mt.pizza4)).toEqual(
            {
                tag: 'HALVE',
                halve1: {
                    tag: 'HALVE',
                    halve1: { tag: 'SLICE', name: 'Dan', toppings: ["MUSHROOMS", "CHEESE"] },
                    halve2: { tag: 'SLICE', name: 'Bob', toppings: ["CHICKEN", "CHEESE"] }
                },
                halve2: {
                    tag: 'SLICE',
                    name: 'Jane',
                    toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
                }
            }
        );
    });

});