class DependenciesController < ApplicationController
    def new
        @dependency = Dependency.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @dependency = @sbom.dependencies.new(dependency_params)
    end

    def dependency_params
        params.require(:depency).permit(:bom_ref, :group, :publisher, :name, :version, :cpe, :purl)
    end
end
