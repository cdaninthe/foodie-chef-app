class UserReviewsSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :recipe
end
