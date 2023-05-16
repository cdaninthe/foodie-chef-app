class BookmarksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  
    #NOT NEEDED
    def index
        render json: Bookmark.all, status: :ok
    end

    def create
        bookmark = @current_user.bookmarks.create!(bookmark_params)
        render json: bookmark, status: :created
    end

    def update
        bookmark = Bookmark.find_by(id: params[:id])
        bookmark.update!(bookmark_params)
        render json: bookmark, status: :accepted
    end

    def destroy
        bookmark = Bookmark.find_by(id: params[:id])
        bookmark.destroy
        head :no_content
    end

    private

    def bookmark_params
        params.permit(:note, :user_id, :recipe_id)
    end

    def render_not_found_response
        render json: {errors: ["Bookmark was not found."]}, status: not_found 
    end

end
