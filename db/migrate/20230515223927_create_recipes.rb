class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :image_url
      t.string :category
      t.integer :total_time
      t.string :difficulty
      t.integer :servings
      t.text :ingredients
      t.text :directions

      t.references :chef, references: :users, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
