class VulnerabilitiesController < ApplicationController
    def new
        @vulnerability = Vulnerability.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

    def index
        if params[:sbom_id]
            @sbom = Sbom.find(params[:sbom_id])
            render json: @sbom.vulnerabilities, status: :ok
        else 
            render json: Vulnerability.all, status: :ok
        end
    end

    def show
        @vulnerability = Vulnerability.find(params[:id])
        render json: @vulnerability, status: :ok
    end

    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :recommendation, affected: [])
    end
end