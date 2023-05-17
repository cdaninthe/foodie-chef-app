# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding database..."

#  CREATE USERS
User.create(username: "John", password_digest: "password")
User.create(username: "Jane", password_digest: "password")
User.create(username: "Mary", password_digest: "password")


# CREATE RECIPES
Recipe.create(
    title: "Avocado Egg Salad", 
    image_url: 'https://www.commonthreads.org/wp-content/uploads/2021/08/IMG_0095-compressed-scaled-1.jpg',
    category: "Breakfast",
    total_time: 20,
    difficulty: "Easy",
    servings: 2,
    ingredients: "1/2 stalk celery, 1 t parsley, 1 whole hard boiled egg, 1 small avocado, 2 T nonfat plain yogurt, 1/2 lime",
    directions: "Mash avocado and hard boiled eggs in separate bowls. Add the plain yogurt in the mixing bowl with the eggs. Add chopped celery and parsley into the egg mixture. Lastly, squeeze the lime juice from the lime and add it to the avocado, along with the salt and pepper to taste. Spread the avocado and egg mix on whole wheat toast, or use them as dip for veggies.",    
    chef_id: User.first.id
)

Recipe.create(
    title: "Pumpkin Hummus", 
    image_url: 'https://www.commonthreads.org/wp-content/uploads/2021/08/IMG_0020.jpg',
    category: "Snack",
    total_time: 15,
    difficulty: "Easy",
    servings: 6,
    ingredients: "1-15 oz can chickpeas, 1/3 C tahini, 1 C pumpkin puree, 1/8 tsp salt, 1/4 C olive oil, 2 cloves garlic, 1/4 C lemon juice, 1 tsp pumpkin seeds, 1 tsp parsley",
    directions: "Drain and rinse chickpeas. Stir tahini very well. Measure out all ingredients. Blend the Hummus. In a blender or food processor, add chickpeas, tahini, puree, salt, olive oil, garlic, and lemon juice. Blend until smooth. If too thick, add water slowly and continue to blend until desired consistency. Transfer hummus to a serving bowl. Garnish with pumpkin seeds and parsley. Serve with whole grain pita bread, pretzels, or fresh veggies.",    
    chef_id: User.first.id
)

Recipe.create(
    title: "Roasted Pineapple", 
    image_url: 'https://www.commonthreads.org/wp-content/uploads/2021/08/IMG_9185-compressed-scaled-1.jpg',
    category: "Dessert",
    total_time: 30,
    difficulty: "Easy",
    servings: 6,
    ingredients: "1 pineapple, 1/2 tsp cinnamon",
    directions: "Preheat the oven to 450° F. Cube the pineapple. Measure the cinnamon. Arrange the pineapple cubes on a foil lined baking tray. Lightly sprinkle with cinnamon. Roast for 15-20 minutes until golden. Serve warm or at room temperature with a dollop of plain yogurt (optional).",    
    chef_id: User.first.id
)


# CREATE REVIEWS
Recipe.all.each do |recipe|
    2.times do
        recipe.reviews.create(
            rating: rand(1..5),
            comment: Faker::Lorem.paragraph(sentence_count: 3),
            user_id: rand(2..3)
        )
    end
end

# CREATE BOOKMARKS
Bookmark.create(user_id: 2, recipe_id: 1, note:"try this for sunday brunch")
Bookmark.create(user_id: 2, recipe_id: 3, note:"try this dessert")
Bookmark.create(user_id: 3, recipe_id: 2, note:"try this hummus")

puts "Done seeding!!!"