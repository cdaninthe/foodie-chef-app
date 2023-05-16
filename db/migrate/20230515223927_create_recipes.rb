class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :image_url
      t.string :type
      t.string :cuisine
      t.integer :total_time
      t.string :difficulty
      t.integer :servings
      t.text :ingredients
      t.text :directions

      t.timestamps
    end
  end
end
