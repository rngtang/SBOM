class ChildrenController < ApplicationController
    def new
        @child = Child.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @child = @sbom.children.new(child_params)
    end

    def child_params
        params.permit(:ref, dependsOn: [])
    end
end