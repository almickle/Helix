Rails.application.routes.draw do

  namespace :api do
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/me', to: 'users#show'

    get '/genelibrary', to: 'libraries#show'
    post '/addgene', to: 'genes#add_gene_to_library'
    post '/removegene', to: 'genes#remove_gene_from_library'

    post '/newannotation', to: 'annotations#create'
    post '/annotations', to: 'annotations#show_gene_annotations'
    post '/deleteannotation', to: 'annotations#delete'

    get '/michael/:key', to: 'users#michael'
  end

  get "*path", to: "frontend#render", constraints: ->(req) { !req.xhr? && req.format.html? }

end
