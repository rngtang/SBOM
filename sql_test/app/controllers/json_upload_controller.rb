class JsonUploadController < ApplicationControllerController
    skip_before_action :verify_authenticity_token, only: [:upload]

    def upload
        file = params[:file]
        json_data = JSON.parse(File.read(file.tempfile))

        json_data.each do |record|
          # Assuming the table name is 'my_table' Sbom replace by the name of the table
          Sbom.create!(record)
        end

        render json: { status: 'success' }
      rescue => e
        render json: { status: 'error', message: e.message }
      end
end