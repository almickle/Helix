class FrontendController < ActionController::Base
    def render
      render file: 'public/index.html'
    end
end