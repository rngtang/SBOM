class VulnerabilitiesController < ApplicationController
    
    def new
        @vulnerability = Vulnerability.new
    end

    # Looks for the sbom id and creates a vulnerability associated to the sbom
    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

    # Looks for a vulnerability either through the unique vulnID or the sbom_id to which is associated
    def index
        if params[:vulnID]
          @vulnerabilities = Vulnerability.where(vulnID: params[:vulnID])
          render json: @vulnerabilities, status: :ok
        elsif params[:sbom_id]
          @sbom = Sbom.find(params[:sbom_id])
          render json: @sbom.vulnerabilities, status: :ok
        else 
          render json: Vulnerability.all, status: :ok
        end
    end

    def vulnaffected
      @sbom = Sbom.find(params[:sbom_id])
      @vulnerabilities = @sbom.vulnerabilities
      @affected = [];
      for vuln in @vulnerabilities do
        for i in vuln.affected do
          @affected << i
        end
      end 
      render json: @affected, status: :ok
    end

    # Renders to show a vulnerability
    def show
        @vulnerability = Vulnerability.find(params[:id])
        render json: @vulnerability, status: :ok
    end

    # Defines parameters in a vulnerability
    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :recommendation, affected: [])
    end
    
end