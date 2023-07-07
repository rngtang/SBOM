class VulnerabilitiesController < ApplicationController
    def new
        @vulnerability = Vulnerability.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

    def index
        @sbom = Sbom.find(params[:sbom_id])
        render json: @sbom.vulnerabilities, status: :ok
    end

    def show
        @vulnerability = Vulnerability.find(params[:id])
        render json: @vulnerability, status: :ok
    end

    def all
        @vulnerabilities = Vulnerability.all
        render json: @vulnerabilities, status: :ok
    end

    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :recommendation, affected: [])
    end
end