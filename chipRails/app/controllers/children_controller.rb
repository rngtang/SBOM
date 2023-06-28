class ChildrenController < ApplicationController
    protect_from_forgery with: :null_session

    def new
        @child = Child.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @child = @sbom.children.new(child_params)
        # respond_to do |format|
        #     if @child.save
        #         format.json { render json: @child}
        #     else
        #         format.json { head :no_content}
        #     end
        # end
    end

    # def all 
    #     @children = Child.all
    #     render json: @children, status: :ok
    # end

    def index
        @sbom = Sbom.find(params[:sbom_id])
        @children = @sbom.children
        render json: @children, status: :ok
    end

    def show
        @child = Child.find(params[:id])
        render json: @children, status: :ok
    end

    def tree
        @child = Child.find(params[:id])
        childrenArray = @child.dependsOn
        @newChild = Child.where(ref: childrenArray, sbom_id: @child.sbom_id)
        render json: @newChild, status: :ok
    end

    def child_params
        params.permit(:ref, dependsOn: [])
    end
end