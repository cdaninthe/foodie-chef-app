class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :bookmarks 
  has_many :reviews
  has_many :chef_recipes
end
