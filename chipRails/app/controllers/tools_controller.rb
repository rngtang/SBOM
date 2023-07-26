class ToolsController < ApplicationController
    def new
        @tool = Tool.new
    end
    
    # Finds the metadata to which the tool is associated with
    def index
        @metadatum = Metadatum.find(params[:metadatum_id])
        render json: @metadatum.tools, status: :ok
    end
    
    # Creates a new tool
    def create
        @metadatum = Metadatum.find(params[:metadatum_id])
        @tool = @metadatum.tool.new(tool_params)
    end

    # Parameters that a tool accepts
    def tool_params
        params.require(:tool).permit(:vendor, :name, :version)
    end
end