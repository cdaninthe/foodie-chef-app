class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :category, :total_time, :difficulty, :servings, :ingredients, :directions, :chef_id

  has_many :reviews
  has_many :users
  belongs_to :chef
end
