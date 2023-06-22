class DependencyController < ApplicationController

    def new
        @dependency = Dependency.new
    end

    def create
        @dependency = Dependency.new()

      end

end
