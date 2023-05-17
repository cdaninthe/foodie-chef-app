class BookmarkSerializer < ActiveModel::Serializer
  attributes :id, :note

  belongs_to :user
  belongs_to :recipe
end
