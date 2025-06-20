# Menu Updates Documentation

This document outlines the recent updates made to the Bread N' Br☕︎w menu system.

## 🍕 New Pizza Tab

Added a new "Pizza" category with the following items:

### Pizza Menu Items

1. **Margherita Pizza** - $16.50

   - Fresh mozzarella, tomato sauce, and basil on our house-made dough

2. **Classic Cheese Pizza** - $15.00

   - Traditional cheese pizza with option to add pepperoni ($1.50)
   - Features customization modal for pepperoni add-on

3. **Spicy Brooklyn Pizza** - $18.75

   - Pepperoni, jalapeños, and spicy sauce on thin crust

4. **Flatbread Pizza** - $14.50
   - Artisan flatbread with seasonal toppings

## 🥪 Updated Menu Items

### Breakfast Items

**Updated:**

- **Bacon Egg & Cheese** - $8.50

  - Crispy bacon, scrambled eggs, and melted cheese on a fresh roll

- **Avocado Toast** - $9.75
  - Smashed avocado on multigrain bread with sea salt and lemon
  - **Updated:** Removed test options, added $2.00 bacon add-on option
  - Features customization modal for bacon add-on

### Lunch Items

**Updated to include only:**

- **Turkey & Swiss** - $12.50

  - Sliced turkey breast with Swiss cheese, lettuce, and tomato

- **Caprese Sandwich** - $11.75
  - Fresh mozzarella, tomatoes, basil, and balsamic on ciabatta

## 🥐 Notable French Pastries

Added authentic French pastries to the Pastries section:

1. **Madeleine** - $3.50

   - Shell-shaped sponge cake with lemon zest

2. **Macaron** - $3.25

   - Delicate almond meringue sandwich cookies

3. **Profiterole** - $4.75

   - Choux pastry filled with cream and chocolate drizzle

4. **Mille-feuille** - $6.50

   - Napoleon pastry with layers of puff pastry and cream

5. **Tarte Tatin** - $7.25

   - Upside-down apple tart with caramelized apples

6. **Croquembouche** - $8.50
   - Tower of cream puffs bound with caramel

## 🏷️ Menu Tab Organization

**Updated tab order to position "Sweets" between "Coffee" and "Tea":**

Previous order:

```
All → Coffee → Tea → Iced/Frozen → Pastries → Breads → Sweets → Seasonal → Breakfast → Lunch
```

New order:

```
All → Coffee → Sweets → Tea → Iced/Frozen → Pastries → Breads → Pizza → Breakfast → Lunch → Seasonal
```

### Changes Made:

- Moved "Sweets" to position between "Coffee" and "Tea"
- Added "Pizza" tab in the middle section
- Moved "Seasonal" to the end for better UX flow

## 🛠️ Technical Implementation

### Customization System Updates

Enhanced the `CustomizeModal` component to handle item-specific customizations:

- **Classic Cheese Pizza**: Add pepperoni option (+$1.50)
- **Avocado Toast**: Add bacon option (+$2.00)
- **Other items**: Default beverage customizations (milk alternatives, syrups, etc.)

### Component Changes

1. **MenuSection.tsx**

   - Updated `categories` array with new order
   - Added pizza menu items
   - Updated breakfast and lunch items
   - Added French pastries

2. **ProductCard.tsx**

   - Added `hasCustomizations` prop
   - Added customization hints for specific items
   - Enhanced type definitions

3. **CustomizeModal.tsx**
   - Implemented item-specific customization logic
   - Added logic for pizza pepperoni and avocado toast bacon options
   - Maintained existing customization system for beverages

## 🎯 User Experience Improvements

### Visual Cues

- Items with customization options now display hints (e.g., "Add pepperoni for $1.50")
- Clear category organization for easier navigation
- Logical tab ordering that flows from hot beverages → sweets → cold beverages → food items

### Accessibility

- All new items include proper descriptions
- Customization options are clearly labeled with pricing
- Consistent pricing format throughout

### Performance

- No changes to the filtering or search functionality
- Maintained existing component structure for minimal impact
- Type-safe implementation with TypeScript

## 🔮 Future Considerations

### Potential Enhancements

1. **Image Assets**: Add product images for pizza items
2. **Seasonal Menus**: Expand seasonal offerings
3. **Dietary Options**: Add gluten-free or vegan indicators
4. **Combo Deals**: Implement meal combo pricing
5. **Time-based Availability**: Show breakfast/lunch items based on time of day

### Maintenance Notes

- Menu items are easily configurable in `MenuSection.tsx`
- Customization logic can be extended in `CustomizeModal.tsx`
- Category order can be modified in the `categories` array
- All items follow consistent data structure for easy updates

---

**Implementation Date**: Current  
**Status**: Complete and Testing Ready  
**Next Review**: After user feedback collection
