class DependenciesController < ApplicationController
    protect_from_forgery with: :null_session

    def new
        @dependency = Dependency.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @dependency = @sbom.dependencies.new(dependency_params)
        # respond_to do |format|
        #     if @dependency.save
        #         format.json { render json: @dependency}
        #     else
        #         format.json { head :no_content}
        #     end
        # end
    end

    def index
        @sbom = Sbom.find(params[:sbom_id])
        @dependencies = @sbom.dependencies
        render json: @dependencies, status: :ok
    end

    def show
        @dependency = Dependency.find(params[:id])
        render json: @dependencies, status: :ok
    end

    def tree
        @dependency = Dependency.find(params[:id])
        dependenciesArray = @dependency.dependsOn
        @newdependency = Dependency.where(ref: dependenciesArray, sbom_id: @dependency.sbom_id)
        render json: @newdependency, status: :ok
    end

    def dependency_params
        params.permit(:ref, dependsOn: [])
    end
end