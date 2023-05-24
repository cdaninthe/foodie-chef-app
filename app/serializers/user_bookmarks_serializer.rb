class UserBookmarksSerializer < ActiveModel::Serializer
  attributes :id, :recipe_id, :note, :recipe
end
