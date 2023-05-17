class RecipesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    # skip_before_action :authorize, only: :index
  
    def index
        recipes = Recipe.all
        render json: recipes, status: :ok
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe, status: :ok
    end

    def reviews
        reviews = Recipe.find_by(id: params[:id]).reviews
        render json: reviews, status: :ok
    end

    def create
        # recipe = @current_user.recipes.create!(recipe_params)
        recipe = Recipe.create!(recipe_params)
        render json: recipe, status: :created
    end

    def update
        recipe = Recipe.find_by(id: params[:id])
        recipe.update!(recipe_params)
        render json: recipe, status: :accepted
    end

    def destroy
        recipe = Recipe.find_by(id: params[:id])
        recipe.destroy
        head :no_content
    end

    private

    def recipe_params
        params.permit(:title, :image_url, :category, :total_time, :difficulty, :servings, :ingredients, :directions, :chef_id)
    end

    def render_not_found_response
        render json: {errors: ["Recipe was not found."]}, status: not_found 
    end
end
