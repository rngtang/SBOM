class LicensesController < ApplicationController
    def index
        @dependency = Dependency.find(params[:dependency_id])
        render json: @dependency.licenses, status: :ok
    end
    
    def new
        @license = License.new
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @license = @dependency.components.new(license_params)
    end

    def license_params
        params.require(:license).permit(:iden)
    end
end
