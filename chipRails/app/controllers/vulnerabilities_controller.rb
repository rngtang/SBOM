class VulnerabilitiesController < ApplicationController
    
    def new
        @vulnerability = Vulnerability.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

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

    def show_by_vulnID
      @vulnerability = Vulnerability.find_by(vulnID: params[:vulnID])
      if @vulnerability
          render json: @vulnerability, status: :ok
      else
          render json: { error: 'Vulnerability not found' }, status: :not_found
      end
    end

    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :recommendation, affected: [])
    end
end