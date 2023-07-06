class LicensesController < ApplicationController
    def index
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        render json: @sbomComponent.licenses, status: :ok
    end
    
    def new
        @license = License.new
    end

    def create
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        @license = @sbomComponent.components.new(license_params)
    end

    def license_params
        params.require(:license).permit(:iden)
    end
end
