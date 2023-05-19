class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    skip_before_action :authorize, only: :create
  
    # delete this
    def index
        users = User.all
        render json: users
    end


    def show
        render json: @current_user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def render_not_found_response
        render json: {errors: ["User was not found."]}, status: not_found 
    end
end
