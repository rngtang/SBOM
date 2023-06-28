class DependenciesController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        @sbom = Sbom.find(params[:sbom_id])
        render json: @sbom.dependencies, status: :ok
    end

    def all
        @dependencies = Dependency.all
        render json: @dependencies, status: :ok
    end

    def show
        @dependency = Dependency.find(params[:id])
        render json: @dependency, status: :ok
    end
    
    def new
        @dependency = Dependency.new
    end

    def destroy
        @dependency = Dependency.find(params[:id])
        if @dependency.present?
            @dependency.destroy
        end
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @dependency = @sbom.dependencies.new(dependency_params)
    end

    def dependency_params
        params.permit(:bom_ref, :group, :publisher, :name, :version, :cpe, :purl)
    end
end
