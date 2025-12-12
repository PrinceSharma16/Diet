document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const mealPlanForm = document.getElementById('mealPlanForm');
    const resultsSection = document.getElementById('resultsSection');
    const planDetails = document.getElementById('planDetails');
    const regenerateBtn = document.getElementById('regenerateBtn');

    mealPlanForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        planDetails.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p class="text-gray-600">Cooking up your perfect meal plan...</p>
            </div>
        `;
        resultsSection.classList.remove('hidden');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        // Collect form data
        const formData = new FormData(mealPlanForm);
        const data = {
            age: parseInt(formData.get('age')),
            gender: formData.get('gender'),
            height_cm: parseInt(formData.get('height_cm')),
            weight_kg: parseInt(formData.get('weight_kg')),
            activity_level: formData.get('activity_level'),
            goal: formData.get('goal'),
            dietary_preferences: Array.from(formData.getAll('dietary_preferences')),
            allergies: Array.from(formData.getAll('allergies')),
            meals_per_day: parseInt(formData.get('meals_per_day')),
            cuisine_preferences: [], // Can be added to the form later
            seed: Math.floor(Math.random() * 1000) // Random seed
        };

        try {
            // In a real app, this would be a fetch call to your API
            // const response = await fetch('/api/v1/plan/generate', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // });
            // const result = await response.json();
            
            // For demo purposes, we'll use a mock response
            const result = generateMockPlan(data);
            
            // Display the results
            displayMealPlan(result);
        } catch (error) {
            console.error('Error:', error);
            planDetails.innerHTML = `
                <div class="bg-red-50 border-l-4 border-red-500 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <i data-feather="alert-triangle" class="text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">Oops! Something went wrong while generating your meal plan. Please try again.</p>
                        </div>
                    </div>
                </div>
            `;
            feather.replace();
        }
    });

    // Regenerate button handler
    regenerateBtn.addEventListener('click', function() {
        mealPlanForm.dispatchEvent(new Event('submit'));
    });

    // Function to display the meal plan
    function displayMealPlan(plan) {
        let html = `
            <div class="space-y-8">
                <!-- Summary Section -->
                <div class="bg-blue-50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Nutrition Summary</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <p class="text-sm text-gray-500">Daily Calories</p>
                            <p class="text-2xl font-bold text-gray-800">${plan.daily_calorie_target} kcal</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <p class="text-sm text-gray-500">Protein</p>
                            <p class="text-2xl font-bold text-gray-800">${plan.macros.protein_g}g (${plan.macros.protein_percent}%)</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <p class="text-sm text-gray-500">Carbs</p>
                            <p class="text-2xl font-bold text-gray-800">${plan.macros.carbs_g}g (${plan.macros.carbs_percent}%)</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <p class="text-sm text-gray-500">Fat</p>
                            <p class="text-2xl font-bold text-gray-800">${plan.macros.fat_g}g (${plan.macros.fat_percent}%)</p>
                        </div>
                    </div>
                </div>

                <!-- Daily Meals -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Today's Meals</h3>
                    <div class="space-y-4">
        `;

        // Add meals
        plan.meals.forEach(meal => {
            html += `
                <div class="meal-card bg-white rounded-lg shadow-sm overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">${meal.meal_type}</span>
                                <h4 class="text-xl font-semibold text-gray-800 mb-1">${meal.name}</h4>
                                <p class="text-gray-600">${meal.serving}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-2xl font-bold text-gray-800">${meal.calories} kcal</p>
                            </div>
                        </div>

                        <div class="mt-4">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Protein: ${meal.macros.protein}g</span>
                                <span>Carbs: ${meal.macros.carbs}g</span>
                                <span>Fat: ${meal.macros.fat}g</span>
                            </div>
                            <div class="flex h-2 rounded-full overflow-hidden">
                                <div class="nutrition-bar nutrition-bar-protein" style="width: ${meal.macros.protein_percent}%"></div>
                                <div class="nutrition-bar nutrition-bar-carbs" style="width: ${meal.macros.carbs_percent}%"></div>
                                <div class="nutrition-bar nutrition-bar-fat" style="width: ${meal.macros.fat_percent}%"></div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <h5 class="font-medium text-gray-800 mb-2">Ingredients</h5>
                            <ul class="list-disc pl-5 text-gray-600 space-y-1">
                                ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                            </ul>
                        </div>

                        ${meal.substitutes && meal.substitutes.length > 0 ? `
                        <div class="mt-4">
                            <h5 class="font-medium text-gray-800 mb-2">Substitutes</h5>
                            <ul class="list-disc pl-5 text-gray-600 space-y-1">
                                ${meal.substitutes.map(sub => `<li>${sub}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>

                <!-- Grocery List -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Grocery List</h3>
                    <div class="bg-white rounded-lg shadow-sm p-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${plan.grocery_list.map(item => `
                                <div class="flex items-center">
                                    <input type="checkbox" class="rounded text-blue-500 mr-3">
                                    <span>${item}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Tips -->
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Nutrition Tips</h3>
                    <div class="bg-white rounded-lg shadow-sm p-5">
                        <ul class="space-y-3">
                            ${plan.tips.map(tip => `
                                <li class="flex items-start">
                                    <i data-feather="check-circle" class="text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                    <span>${tip}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Calculations (Hidden by default) -->
                <div>
                    <button id="toggleCalcBtn" class="text-blue-600 hover:text-blue-800 flex items-center mb-4">
                        <i data-feather="chevron-down" class="mr-1"></i>
                        <span>Show Calculations</span>
                    </button>
                    <div id="calculationsSection" class="hidden bg-gray-50 rounded-lg p-5">
                        <h4 class="font-medium text-gray-800 mb-3">How we calculated your plan:</h4>
                        <div class="space-y-3">
                            <p><span class="font-medium">BMR (Basal Metabolic Rate):</span> ${plan.calculation.bmr.toFixed(0)} kcal/day</p>
                            <p><span class="font-medium">Activity Multiplier (${plan.calculation.multiplier_name}):</span> ×${plan.calculation.multiplier}</p>
                            <p><span class="font-medium">Goal Adjustment (${plan.goal === 'weight_loss' ? 'Weight Loss' : plan.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}):</span> ${plan.calculation.goal_adjustment > 0 ? '+' : ''}${plan.calculation.goal_adjustment}%</p>
                            <p class="pt-2 border-t border-gray-200"><span class="font-medium">Final Daily Target:</span> ${plan.daily_calorie_target} kcal/day</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        planDetails.innerHTML = html;
        feather.replace();

        // Toggle calculations
        const toggleCalcBtn = document.getElementById('toggleCalcBtn');
        const calculationsSection = document.getElementById('calculationsSection');
        
        toggleCalcBtn.addEventListener('click', function() {
            const isHidden = calculationsSection.classList.contains('hidden');
            calculationsSection.classList.toggle('hidden');
            
            if (isHidden) {
                toggleCalcBtn.innerHTML = `
                    <i data-feather="chevron-up" class="mr-1"></i>
                    <span>Hide Calculations</span>
                `;
            } else {
                toggleCalcBtn.innerHTML = `
                    <i data-feather="chevron-down" class="mr-1"></i>
                    <span>Show Calculations</span>
                `;
            }
            feather.replace();
        });
    }

    // Mock data generator for demonstration
    function generateMockPlan(data) {
        // Calculate BMR using Mifflin-St Jeor equation
        let bmr;
        if (data.gender === 'male') {
            bmr = 10 * data.weight_kg + 6.25 * data.height_cm - 5 * data.age + 5;
        } else {
            bmr = 10 * data.weight_kg + 6.25 * data.height_cm - 5 * data.age - 161;
        }

        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        const multiplier = activityMultipliers[data.activity_level];
        const multiplierName = data.activity_level.charAt(0).toUpperCase() + data.activity_level.slice(1);

        // Goal adjustment
        let goalAdjustment;
        if (data.goal === 'weight_loss') {
            goalAdjustment = -20;
        } else if (data.goal === 'gain') {
            goalAdjustment = 10;
        } else {
            goalAdjustment = 0;
        }

        // Calculate daily calorie target
        const dailyCalories = Math.round(bmr * multiplier * (1 + goalAdjustment/100));

        // Macro distribution
        const macros = {
            protein_g: Math.round((dailyCalories * 0.3) / 4), // 30% protein
            protein_percent: 30,
            carbs_g: Math.round((dailyCalories * 0.4) / 4),  // 40% carbs
            carbs_percent: 40,
            fat_g: Math.round((dailyCalories * 0.3) / 9),    // 30% fat
            fat_percent: 30
        };

        // Generate meals (mock data)
        const meals = [];
        const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Snack'];
        const mealNames = [
            'Masala Oats with Herbs',
            'Besan Chilla with Mint Chutney',
            'Palak Paneer with Roti',
            'Brown Rice Pulao with Raita',
            'Vegetable Khichdi',
            'Dal Tadka with Jeera Rice',
            'Chana Masala with Bhatura',
            'Idli Sambar with Coconut Chutney',
            'Aloo Paratha with Curd'
        ];
for (let i = 0; i < data.meals_per_day; i++) {
            const mealCalories = Math.round(dailyCalories / data.meals_per_day * (0.9 + Math.random() * 0.2));
            
            meals.push({
                meal_type: mealTypes[i] || 'Meal',
                name: mealNames[Math.floor(Math.random() * mealNames.length)],
                serving: '1 serving',
                calories: mealCalories,
                macros: {
                    protein: Math.round(mealCalories * 0.3 / 4),
                    protein_percent: 30,
                    carbs: Math.round(mealCalories * 0.4 / 4),
                    carbs_percent: 40,
                    fat: Math.round(mealCalories * 0.3 / 9),
                    fat_percent: 30
                },
                ingredients: [
                    'Oats, Masala, Herbs',
                    'Besan, Spices, Onion',
                    'Palak, Paneer, Garam Masala',
                    'Brown Rice, Vegetables, Spices'
                ],
                substitutes: [
                    'Dalia for Oats',
                    'Moong Dal Chilla for Besan Chilla',
                    'Sarson Ka Saag for Palak',
                    'Quinoa for Brown Rice'
                ]
});
        }

        // Grocery list
        const groceryList = [
            'Oats',
            'Besan',
            'Palak',
            'Paneer',
            'Brown Rice',
            'Masala',
            'Jeera',
            'Turmeric',
            'Coriander',
            'Ginger',
            'Garlic'
        ];
// Tips
        const tips = [
            'Drink at least 2 liters of water daily',
            'Have protein with every meal to stay full longer',
            'Include vegetables in at least two meals per day',
            'Prepare meals in advance to stay on track',
            'Get 7-8 hours of sleep for optimal metabolism'
        ];

        return {
            daily_calorie_target: dailyCalories,
            calculation: {
                bmr,
                multiplier,
                multiplier_name: multiplierName,
                goal_adjustment: goalAdjustment
            },
            macros,
            meals,
            grocery_list: groceryList,
            tips,
            weekly_variations: [
                'Rotate protein sources throughout the week',
                'Try new vegetables each week',
                'Include one new recipe weekly'
            ],
            goal: data.goal
        };
    }
});