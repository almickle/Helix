class UsersController < ApplicationController

    # need to remove passwords from json render

    def show
        user = User.find_by(id: session[:user_id])
        if user
        render json: user
        else
        render json: { error: session[:user_id] }, status: :unauthorized
        end
    end

    def create
        new_user = User.create(username: params[:username], email: params[:email], password: params[:password])
        Library.create(user_id: new_user.id)
        render json: new_user
    end

    def michael
        render json: User.first
    end
end
