class CreateBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id
      t.integer :recipe_id
      t.text :note

      t.timestamps
    end
  end
end
