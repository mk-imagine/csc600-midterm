/* ==========================================================================  **
## Midterm Instructions

See this Google doc for clarifications:

https://docs.google.com/document/d/1LXaPZJr0pebAmMjJGBgxO26yIjc-DJOSE1W-YmwWx7k/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in midterm.ts, back to the github classroom
   repository. Please make sure you solution compiles!!! 

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs midterm.ts
   ```
   to produce a file `midterm.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire midterm.ts must compile, and we must be able to run the compiled js file
   using `node`. **Do not** commit your `.js` file.
2. **Do not** change any of the function interfaces.
3. **Do not** use any external libraries.
4. Replace `throw Error("TODO")` with your code. If you do not attempt a problem,
   please leave the `throw Error("TODO")` code there unmodified.
5. Always remember to check the function input types and the output types.
6. You can create any other additional helper functions that you would like.
7. You can leave testing code in provided that your code compiles and does not
   depend on external libraries. Remember it is up to you to test your own code.
8. You can use your solutions to questions in this assignment to answer other question
   in this assignment.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Mark Kim"; // TODO: FILL ME IN

// If you used resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];


/* ==========================================================================  **
## OPTIONAL SURVEY

This section is purely optional. We are mainly asking because we would like to
improve the homeworks to see what you're thinking as you try to solve these
problems. This will not affect your grade in any way. As a reminder, Google is a
resource that we all use.
** ============================================================================ */

export const GOOGLE_QUERIES: {[id: string]: string[]} = {
    "1a": [],
    "1b": [],
    "2": [],
    "3a": [],
    "3b": [],
    "3c": [],
    "bonus": [],
}; 



/* ==========================================================================  **
## CSC 600 Midterm: Making a Shareable Pizza

You're building an app that lets users order a shareable pizza by choosing
different toppings for different parts of the pizza. In this midterm, we'll
build out some of the functionality for this application.

There are several toppings we can put on this pizza:
1. CHEESE
2. CHICKEN
3. PEPPERONI
3. MUSHROOMS
4. SAUCE

Normally, we could encode a pizza as just a list of toppings. However, we would
like to make a shareable pizza. Consequently we would like to encode the ability
to divide the pizza up into sections, and choose different toppings for 
different sections of the pizza. This motivates the following encoding.

** ============================================================================ */

export type Toppings = 
    "CHEESE"
  | "SAUCE"
  | "CHICKEN"
  | "PEPPERONI"
  | "MUSHROOMS";

export type Slice = {
    tag: "SLICE",
    name: string,             // The name of the person that the pizza is for
    toppings: Toppings[]      // An array of toppings,
                              // 0th index contains the toppings at the bottom
                              // duplicate toppings means that we have a double order of those toppings
}

export type Halve = {
    tag: "HALVE",
    halve1: Pizza,
    halve2: Pizza
};

export type Pizza = 
    Slice
  | Halve


export function newSlice(name: string, toppings: Toppings[]): Slice {
    return {
        tag: "SLICE",
        name: name,
        toppings: toppings
    };
}

export function newHalve(halve1: Pizza, halve2: Pizza): Halve {
    return {
        tag: "HALVE",
        halve1: halve1,
        halve2: halve2
    };
}


/* ==========================================================================  **
## 

Example: pizza1

 A ["MUSHROOM", "CHEESE"] slice
 Slice
 |-----------------------------------------------| 
 | Dan                                           |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |       ["MUSHROOM", "CHEESE"]                 |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|
 

Example: pizza2

 A ["SAUCE", "CHICKEN", "CHICKEN"] slice
 
 |-----------------------------------------------| 
 | Jane                                          |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |       ["SAUCE", "CHICKEN", "CHICKEN"]         |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|



 Example: pizza3

 A ["MUSHROOM", "CHEESE"] halve and
 a ["CHICKEN", "CHEESE"] halve

 |-----------------------------------------------| 
 | Dan                                           |
 |                                               |
 |                                               |
 |           ["MUSHROOM", "CHEESE"]             |
 |                                               |
 |                                               |
 |-----------------------------------------------|
 | Bob                                           |
 |                                               |
 |                                               |
 |            ["CHICKEN", "CHEESE"]              |
 |                                               |
 |                                               |
 |                                               |
 |-----------------------------------------------|

Example: pizza4

 The top halve has A ["MUSHROOM", "CHEESE"] halve slice and
 a ["CHICKEN", "CHEESE"] halve slice.
 The bottom halve has ["SAUCE", "CHICKEN", "CHICKEN"]

 |-----------------------------------------------| 
 | Dan                   | Bob                   |
 |                       |                       |
 |                       |                       |
 | ["MUSHROOMS",         | ["CHICKEN",           |
 |  "CHEESE"]            |  "CHEESE"]            |
 |                       |                       |
 |                       |                       |
 |-----------------------------------------------|
 | Jane                                          |
 |                                               |
 |                                               |
 |  ["SAUCE", "CHICKEN", "CHICKEN"]              |
 |                                               |
 |                                               |
 |-----------------------------------------------|


** ============================================================================ */

export const pizza1 = newSlice("Dan", ["MUSHROOMS", "CHEESE"]);

export const pizza2 = newSlice("Jane", ["SAUCE", "CHICKEN", "CHICKEN"]);

export const pizza3 = 
    newHalve(
        newSlice("Dan", ["MUSHROOMS", "CHEESE"]),
        newSlice("Bob", ["CHICKEN", "CHEESE"]),
    );

export const pizza4 =
    newHalve(
        pizza3,
        pizza2,
    );



/* ==========================================================================  **
## Problem 1: Basic functions on pizza slices (20 pts)

** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 1a (5 pts):

Write a *pure* function that renames a slice.

Example:
    renameSlice(pizza1, "Daniel") = 
        { 
            tag: 'SLICE',
            name: 'Daniel',
            toppings: [ 'MUSHROOMS', 'CHEESE' ]
        }

Example:
    renameSlice(pizza1, "Danny") = 
        { 
            tag: 'SLICE',
            name: 'Danny',
            toppings: [ 'MUSHROOMS', 'CHEESE' ] 
        }

** ----------------------------------------------------- */

export function renameSlice(slice: Slice, newName: string): Slice {
    return {
        tag: "SLICE",
        name: newName,
        toppings: slice.toppings
    }
}

/* ----------------------------------------------------- **
### Problem 1b (5 pts):

Write a *pure* function that adds toppings to the top of a pizza slice.
Duplicate toppings **are** allowed. Remember, this corresponds to having
an extra serving of that topping.

Example:
    addToppingsToSlice(pizza1, []) =
        { 
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE' ] 
        }

Example:
    addToppingsToSlice(pizza1, ["CHICKEN"])
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN' ]
        }

Example:
    addToppingsToSlice(pizza1, ["CHICKEN", "CHEESE"]) = 
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHICKEN', 'CHEESE' ]
        }

Example:
    addToppingsToSlice(pizza2, ["CHICKEN", "CHEESE", "SAUCE"]) = 
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHICKEN', 'CHEESE', 'SAUCE' ]
        }

** ----------------------------------------------------- */

export function addToppingsToSlice(slice: Slice, toppings: Toppings[]): Slice {
    return {
        tag: "SLICE",
        name: slice.name,
        toppings: slice.toppings.concat(toppings)
    }
}


/* ----------------------------------------------------- **
### Problem 1c (10 pts):

Write a *pure* function that removes a topping from a pizza slice.
If the topping does not exist, return the slice unchanged.

Example:
    removeToppingFromSlice(pizza2, "CHICKEN") = 
        { tag: 'SLICE', name: 'Jane', toppings: [ 'SAUCE' ] }

Example:
    removeToppingFromSlice(pizza2, "SAUCE") = 
        { tag: 'SLICE', name: 'Jane', toppings: [ 'CHICKEN', 'CHICKEN' ] }

Example:
    removeToppingFromSlice(pizza2, "CHEESE") =
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
        }

** ----------------------------------------------------- */

export function removeToppingFromSlice(slice: Slice, topping: Toppings): Slice {
    const updated_toppings = slice.toppings.filter(x => topping != x);
    return {
        tag: "SLICE",
        name: slice.name,
        toppings: updated_toppings
    }

}

/* ==========================================================================  **
## Problem 2: Basic functions on Pizzas (35 pts)
** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 2a (10 pts):

Write a *pure* function that gives the weight of a topping.

The weight of toppings is given below.
CHEESE: 4
CHICKEN: 6
MUSHROOMS: 2
PEPPERONI: 1
SAUCE: 3

Example:
    weightOfTopping("CHEESE") = 4

Example:
    weightOfTopping("CHICKEN") = 6

Example:
    weightOfTopping("MUSHROOMS") = 2

Example:
    weightOfTopping("PEPPERONI") = 1

Example:
    weightOfTopping("SAUCE") = 3

** ----------------------------------------------------- */

export function weightOfTopping(topping: Toppings): number {
    switch (topping) {
        case "CHEESE": return 4;
        case "CHICKEN": return 6;
        case "MUSHROOMS": return 2;
        case "PEPPERONI": return 1;
        case "SAUCE": return 3;
    };
}


/* ----------------------------------------------------- **
### Problem 2b (10 pts): 

Write a *pure* function that splits a slice in half if the name of the slice 
matches the given name. The first halve of the pizza should be the original
slice. The second halve of the pizza should be the pizza. If the name of the
slice does not match, return the slice unchanged.

Example:
    weightOfToppingsInSlice(pizza1) = 6

Example:
    weightOfToppingsInSlice(pizza2) = 15

** ----------------------------------------------------- */

export function weightOfToppingsInSlice(slice: Slice): number {
    const weights = slice.toppings.map(weightOfTopping);
    return weights.reduce((acc,x) => acc + x);
}


/* ----------------------------------------------------- **
### Problem 2c (15 pts):

Write a *pure* function that, given a pizza halve and a name, removes
the pizza halve slice with that name. This means that the unremoved
half will "double" in size.
1. Do *not* recurse.
2. As a reminder, you can assume that there are no duplicate names.
3. If the name does not exist, return the halve unchanged.

Example:
    removeSliceFromHalve(pizza3, "Dan") = 
        { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }

Example:
    removeSliceFromHalve(pizza3, "Bob") =
        { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] }

Example:
    removeSliceFromHalve(pizza3, "Jane") = 
        {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
        }

Example:
    removeSliceFromHalve(pizza4, "Jane") =
        {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [ 'CHICKEN', 'CHEESE' ] }
        }

Example:
    removeSliceFromHalve(pizza4, "Dan") =
    {
        tag: 'HALVE',
        halve1: {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Dan', toppings: [Array] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
        },
        halve2: {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
        }
    }

** ----------------------------------------------------- */

export function removeSliceFromHalve(halve: Halve, name: string): Pizza {
    if (halve.halve1.tag === "HALVE" && halve.halve2.tag === "SLICE") {
        if (halve.halve2.name === name) {
            return halve.halve1;
        }
    } else if (halve.halve1.tag === "SLICE" && halve.halve2.tag === "HALVE") {
        if (halve.halve1.name === name) {
            return halve.halve2;
        }
    } else if (halve.halve1.tag === "SLICE" && halve.halve2.tag === "SLICE") {
        if (halve.halve1.name === name) {
            return halve.halve2;
        } else if (halve.halve2.name === name) {
            return halve.halve1;
        }
    }
    return halve;

}


/* ==========================================================================  **
## Problem 3: Complex functions on Pizzas (45 pts)

** ============================================================================ */

/* ----------------------------------------------------- **
### Problem 3a (20 pts): 

Write a **pure** function that adds toppings to all slices in a pizza.
The behavior of adding toppings to a slice is the same as `addToppingsToSlice`.


Example:
    addToppingsToPizza(pizza1, ["CHEESE"]) =
        {
            tag: 'SLICE',
            name: 'Dan',
            toppings: [ 'MUSHROOMS', 'CHEESE', 'CHEESE' ]
        }

Example:
    addToppingsToPizza(pizza2, ["CHEESE", "CHEESE"]) =
        {
            tag: 'SLICE',
            name: 'Jane',
            toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN', 'CHEESE', 'CHEESE' ]
        }

Example:
    addToppingsToPizza(pizza3, ["SAUCE"]) = 
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

Example:
    addToppingsToPizza(pizza4, ["SAUCE"]) =
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

** ----------------------------------------------------- */

export function addToppingsToPizza(pizza: Pizza, toppings: Toppings[]): Pizza {
    if (pizza.tag === "SLICE") {
        return addToppingsToSlice(pizza, toppings);
    }
    return newHalve(addToppingsToPizza(pizza.halve1, toppings), addToppingsToPizza(pizza.halve2, toppings));
}

/* ----------------------------------------------------- **
### Problem 3b (25 pts): 

Write a **pure** function that gets the weight of all toppings in a pizza.
The weight of toppings in a slice is given by `weightOfToppingsInSlice`.
However, the weight of topping is needs to be adjusted for the size of the
slice. In particular, for every halve that a slice is part of, we should
decrease the weight by 50%.

Thus, if a slice is
1. part of 1 halve, then the weight of the topping should be multiplied by 0.5
2. part of 2 halves, then the weight of the topping should be multiplied by 0.25
3. part of 3 halves, then the weight of the topping should be multiplied by 0.125
4. etc.

Example:
    weightOfToppingsInPizza(pizza1) = 6

Example:
    weightOfToppingsInPizza(pizza2) = 15

Example:
    weightOfToppingsInPizza(pizza3) = 8

Example:
    weightOfToppingsInPizza(pizza4) = 11.5

** ----------------------------------------------------- */

export function weightOfToppingsInPizza(pizza: Pizza): number {
    if (pizza.tag === "SLICE") {
        return weightOfToppingsInSlice(pizza);
    }
    const result = [weightOfToppingsInPizza(pizza.halve1) * 0.5, weightOfToppingsInPizza(pizza.halve2) * 0.5]
    return result.reduce((acc, x) => acc + x)
}

/* ==========================================================================  **
## Bonus (30 pts):

Write a **pure** function `tradeSlices` that swaps slices between two people
sharing a pizza. If the names are not found, return the pizza unchanged.
Otherwise, exchange the slices for each other. You may want to do this because
one person has a larger slice than the other.


Example:
    tradeSlices("Dan", "Jane", pizza4) = 
    {
        tag: 'HALVE',
        halve1: {
            tag: 'HALVE',
            halve1: { tag: 'SLICE', name: 'Jane', toppings: [Array] },
            halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
        },
        halve2: { tag: 'SLICE', name: 'Dan', toppings: [ 'MUSHROOMS', 'CHEESE' ] }
    }

Example:
    tradeSlices("Dan", "Bob", pizza4) =
        {
            tag: 'HALVE',
            halve1: {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Bob', toppings: [Array] },
                halve2: { tag: 'SLICE', name: 'Dan', toppings: [Array] }
            },
            halve2: {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
            }
        }

Example:
    tradeSlices("Jill", "Dan", pizza4) =
        {
            tag: 'HALVE',
            halve1: {
                tag: 'HALVE',
                halve1: { tag: 'SLICE', name: 'Dan', toppings: [Array] },
                halve2: { tag: 'SLICE', name: 'Bob', toppings: [Array] }
            },
            halve2: {
                tag: 'SLICE',
                name: 'Jane',
                toppings: [ 'SAUCE', 'CHICKEN', 'CHICKEN' ]
            }
        }

** ============================================================================ */


export function tradeSlices(name1: string, name2: string, pizza: Pizza): Pizza {

    function getAllSlices(pizza: Pizza): Slice[] {
        switch (pizza.tag) {
            case "SLICE": return [pizza] as Slice[];
            default:
                return [...getAllSlices(pizza.halve1), ...getAllSlices(pizza.halve2)]
        }
    }

    function swapSlices(slice1: Slice, slice2: Slice, pizza: Pizza): Pizza {
        if (pizza.tag === "SLICE") {
            if (pizza.name === slice1.name) {
                return slice2;
            }
            if (pizza.name === slice2.name) {
                return slice1;
            }
            return pizza;
        }
        return newHalve(swapSlices(slice1, slice2, pizza.halve1), swapSlices(slice1, slice2, pizza.halve2));
    }

    const slices = getAllSlices(pizza);
    const slice1 = slices.filter(x => x.name === name1);
    const slice2 = slices.filter(x => x.name === name2);
    if (slice1.length === 0 || slice2.length === 0) {
        return pizza;
    }
    return swapSlices(slice1[0],slice2[0], pizza);
}