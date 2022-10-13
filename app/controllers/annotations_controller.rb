class AnnotationsController < ApplicationController
    
    def create
        user = User.find(session[:user_id])
        gene = user.genes.find_by(symbol: params[:symbol])
        new_annotation = Annotation.create(gene_id: gene.id, title: params[:title], body: params[:body], begin: params[:begin], end: params[:end], transcript: params[:transcript], protein: params[:protein])
        render json: new_annotation
    end

    def delete
        Annotation.find(params[:id]).destroy
        head :no_content
    end

    def show_gene_annotations
        user = User.find(session[:user_id])
        gene = user.genes.find_by(symbol: params[:symbol])
        annotations = gene.annotations.where(transcript: params[:transcript], protein: params[:protein])
        render json: annotations
    end
    
end
