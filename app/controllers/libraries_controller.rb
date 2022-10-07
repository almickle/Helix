class LibrariesController < ApplicationController
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user.library.genes
        else
            render json: { error: session[:user_id] }
        end
    end
end
