const DISH_MAP = {
    'ingredient 1': 'Masala Oats',
    'ingredient 2': 'Besan Chilla', 
    'ingredient 3': 'Palak Paneer',
    'ingredient 4': 'Brown Rice Pulao'
};

function chooseDishName(item, recipeDb) {
    if (!item) return item;
    const lower = item.toLowerCase();
    for (const key of Object.keys(DISH_MAP)) {
        if (lower.includes(key.replace(/\s+/g, '').toLowerCase()) || 
            item.toLowerCase().includes(key)) {
            return DISH_MAP[key];
        }
    }
    const found = recipeDb.find(r => r.name.toLowerCase().includes(item.toLowerCase()));
    return found ? found.name : item;
}

function mapSubstitutes(subs, recipeDb) {
    return subs.map(s => ({
        original: s,
        suggestion: chooseDishName(s, recipeDb) || `Try: ${s}`
    }));
}

function formatMeals(meals, recipeDb) {
    return meals.map(m => {
        const name = m.name && !m.name.toLowerCase().startsWith('ingredient') 
            ? m.name 
            : chooseDishName(m.name || m.ingredients?.[0] || '', recipeDb);
        
        const substitutes = (m.substitutes || []).map(s => 
            chooseDishName(s, recipeDb) || s);

        return { ...m, name, substitutes };
    });
}

module.exports = { formatMeals, chooseDishName, mapSubstitutes };