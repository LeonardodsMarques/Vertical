class CategoriesController < ApplicationController
def index
        @categories = Category.where(active: true)
        render json: @categories.select(:id, :title, :description), status: :ok
    end

    def show
        @category = Category.find(params[:id])
        render json: @category, status: :ok
    end

    def create
        @category = Category.new(category_params)
        if @category.save
            render json: @category, status: :created
        else
            render json: @category.errors, status: :unprocessable_entity
        end
    end

    def update
        @category = Category.find(params[:id])
        if @category.update(category_params)
            render json: @category, status: :ok
        else
            render json: @category.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @category = Category.find(params[:id])

        @category.update(active: false)
        render status: :no_content
    end

    private 

    def category_params
        params.permit(:title, :description)
    end
end