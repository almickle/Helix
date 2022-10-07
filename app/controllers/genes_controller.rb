class GenesController < ApplicationController
    def add_gene_to_library
        gene = Gene.create(symbol: params[:symbol], library_id: session[:user_id], taxon: params[:taxon])
        render json: gene
    end

    def remove_gene_from_library
        User.find_by(id: session[:user_id]).library.genes.find_by(symbol: params[:symbol]).destroy
        head :no_content
    end
end
