class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user_id, :recipe_id

  belongs_to :user
  belongs_to :recipe
end
