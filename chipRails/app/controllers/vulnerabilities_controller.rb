class VulnerabilitiesController < ApplicationController
    def new
        @vulnerability = Vulnerability.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :detail, :recommendation, :created, :published, :updated)
    end
end