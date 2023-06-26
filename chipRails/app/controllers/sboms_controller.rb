class SbomsController < ApplicationController
    def new
        @sbom = Sbom.new
    end

    def create
        @user = User.find(params[:user_id])
        @sbom = @user.sboms.new(sbom_params)
    end

    def user_params
        params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :name, :description)
    end
end
