class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :bookmarks, serializer: UserBookmarksSerializer
  has_many :reviews, serializer: UserReviewsSerializer
  has_many :chef_recipes
end
